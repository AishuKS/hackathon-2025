const { supabase } = require('../supabaseClient');
const bcrypt = require('bcryptjs');

// 👤 Sharer Signup
const signupSharer = async (req, res) => {
  const {
    name,
    designation,
    business_name,
    phone,
    email,
    city,
    state,
    password
  } = req.body;

  if (!name || !designation || !business_name || !phone || !email || !city || !state || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('sharer')
    .insert([
      {
        name,
        designation,
        business_name,
        phone,
        email,
        city,
        state,
        password: hashedPassword,
        created_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) {
    console.error('Supabase error:', error.message);
    return res.status(500).json({ message: error.message });
  }

  return res.status(201).json({
    message: 'Sharer signed up successfully',
    sharer: data[0]
  });
};

// 🎯 Finder Signup
const signupFinder = async (req, res) => {
  const {
    name,
    receiver_type,
    organization_name,
    phone,
    email,
    city,
    state,
    password
  } = req.body;

  if (!name || !receiver_type || !organization_name || !phone || !email || !city || !state || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('finder')
    .insert([
      {
        name,
        receiver_type,
        organization_name,
        phone,
        email,
        city,
        state,
        password: hashedPassword,
        created_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) {
    console.error('Supabase error:', error.message);
    return res.status(500).json({ message: error.message });
  }

  return res.status(201).json({
    message: 'Finder signed up successfully',
    finder: data[0]
  });
};

// 🔐 Login (for both Sharer and Finder)
const login = async (req, res) => {
  const { email, password } = req.body;

  // Try logging in as Sharer
  const sharerResult = await supabase
    .from('sharer')
    .select('*')
    .eq('email', email);

  if (sharerResult.data && sharerResult.data.length > 0) {
    const user = sharerResult.data[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    return res.status(200).json({ role: 'sharer', user });
  }

  // Try logging in as Finder
  const finderResult = await supabase
    .from('finder')
    .select('*')
    .eq('email', email);

  if (finderResult.data && finderResult.data.length > 0) {
    const user = finderResult.data[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    return res.status(200).json({ role: 'finder', user });
  }

  return res.status(404).json({ message: 'User not found' });
};

module.exports = {
  signupSharer,
  signupFinder,
  login
};
