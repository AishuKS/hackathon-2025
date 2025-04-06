
const { supabase } = require('../supabaseClient');
const { sendEmail } = require('../utils/emailService');
const { isWithin10Miles } = require('../utils/distanceService');

const foodModel = require('../models/foodModel');
const { clearMessages } = require('../chatMemory');

// Change food status
const changeFoodStatus = (req, res) => {
    const { status } = req.body;
    const foodId = req.params.id;

    foodModel.updateFoodStatus(foodId, status, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

// Add Food

const addFood = async (req, res) => {
  try {
    const {
      sharer_id,
      food_item,
      food_type,
      description,
      quantity,
      serving_size,
      pickup_location,
      good_until,
      status,
      allergens
    } = req.body;

    // 🛑 Validation
    if (!sharer_id || !food_item || !quantity || !pickup_location || !good_until || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ✅ Step 1: Insert food listing into Supabase
    const { data, error } = await supabase
      .from('food_listings')
      .insert([
        {
          sharer_id,
          food_item,
          food_type,
          description,
          quantity,
          serving_size,
          pickup_location,
          good_until,
          status,
          posted_at: new Date().toISOString(),
          allergens
        }
      ])
      .select();

    if (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }

    const newFood = data[0];

    // ✅ Step 2: Hardcoded sharer location (can be dynamic later)
    const sharerLoc = {
      latitude: 13.0827,  // Chennai
      longitude: 80.2707
    };

    // ✅ Step 3: Get all finders
    const { data: finders, error: findersError } = await supabase
      .from('finder')
      .select('*');

    if (findersError) {
      console.error('Error fetching finders:', findersError.message);
    } else {
      for (const finder of finders) {
        // Hardcoded finder location for demo
        const finderLoc = {
          latitude: 13.0612,  // Chennai nearby
          longitude: 80.2453
        };

        // ✅ Step 4: Check if within 10 miles
        if (isWithin10Miles(sharerLoc, finderLoc)) {
          const emailContent = `
            <h3>🍲 New food available near you!</h3>
            <p><strong>${food_item}</strong> from your neighborhood</p>
            <p>Pickup at: ${pickup_location}</p>
            <p><strong>Good Until:</strong> ${good_until}</p>
          `;

          await sendEmail(
            finder.email,
            'Food Nearby from Plate2Purpose',
            emailContent
          );
        }
      }
    }

    // ✅ Step 5: Return success response
    return res.status(201).json({
      message: 'Food listed and notifications sent (if any)',
      data: newFood
    });

  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addFood };



// ✏️ Edit Food
const editFood = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
        .from('food_listings')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

    res.status(200).json({ message: 'Food listing updated', data: data[0] });
};


// 📝 Log an update to a food listing
const logFoodUpdate = async (req, res) => {
    const {
        listing_id,
        sharer_id,
        finder_id,
        action,     // 👈 we're checking this
        notes
    } = req.body;

    if (!listing_id || !sharer_id || !action) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const { data, error } = await supabase
        .from('food_listing_updates')
        .insert([
            {
                listing_id,
                sharer_id,
                finder_id,
                action,
                notes,
                timestamp: new Date().toISOString()
            }
        ])
        .select();

    if (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

    // ✅ Clear temp chat if status is "claimed"
    if (action.toLowerCase() === 'claimed') {
        clearMessages(listing_id);
        console.log(`Chat cleared for listing ${listing_id}`);
    }

    return res.status(201).json({
        message: 'Update logged successfully',
        update: data[0]
    });
};


module.exports = {
    addFood, editFood,
    logFoodUpdate
};
