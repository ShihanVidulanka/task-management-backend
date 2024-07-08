const supabase = require('../config/supabaseClient');

class User {
  static async create({ email, password }) {

    
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    if (error) throw error;

    console.log(data);
    const { data, error_saved } = await supabase.from('users').insert([{ email, password }]);
    if (error) throw error_saved;
    return data[0];
  }

  static async findOneByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }
}

module.exports = User;
