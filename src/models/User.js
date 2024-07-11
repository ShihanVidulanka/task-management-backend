const supabase = require('../config/supabaseClient');

class User {
  static async signUp({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        console.error('Error during sign up:', error);
        throw new Error(error.message || 'Sign up failed');
      }

      const { error: dbError } = await supabase.from('users').insert([{ email }]);
      if (dbError) {
        console.error('Error saving user to database:', dbError);
        throw new Error(dbError.message || 'Failed to save user to database');
      }

      return data.user;
    } catch (error) {
      console.error('Sign up failed:', error);
      throw new Error(error.message || 'Sign up failed');
    }
  }

  static async signIn({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error('Error during sign in:', error);
        throw new Error(error.message || 'Invalid credentials');
      }

      return data.user;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw new Error(error.message || 'Sign in failed');
    }
  }
}

module.exports = User;
