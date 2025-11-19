import fetch from 'node-fetch';

const testLogin = async () => {
  const query = `
    mutation {
      login(username: "keltoummalouki@gmail.com", password: "password1234") {
        token
        user {
          id
          username
          role
        }
      }
    }
  `;

  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    
    if (result.data?.login) {
      console.log('Login successful!');
      console.log('Token:', result.data.login.token.substring(0, 20) + '...');
      console.log('User:', result.data.login.user);
    } else {
      console.log('Login failed:', result.errors);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

testLogin();
