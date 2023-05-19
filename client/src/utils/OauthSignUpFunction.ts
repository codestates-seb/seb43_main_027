const oauthSignUp: React.MouseEventHandler = async (e: React.MouseEvent) => {
  e.preventDefault();
  const googleAuthUrl = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google?redirect_uri=http://localhost:3000/signup`;
  window.location.href = googleAuthUrl;
};

export default oauthSignUp;