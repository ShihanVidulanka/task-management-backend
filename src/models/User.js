// models/User.js
const supabase = require('../config/supabaseClient');

class User {
  static async signUp({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        console.error("Error during sign up:", error);
        throw error;
      }

      // Optionally save user data in a 'users' table
      const { error: dbError } = await supabase.from('users').insert([{ email }]);

      if (dbError) {
        console.error("Error saving user to database:", dbError);
        throw dbError;
      }

      return data.user;
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  }

  static async signIn({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Error during sign in:", error);
        throw error;
      }

      return data.user;
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error;
    }
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
