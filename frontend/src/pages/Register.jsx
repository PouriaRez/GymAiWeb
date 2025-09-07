import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
const Register = () => {
  const nav = useNavigate();

  const handleLoginRedirect = () => {
    nav('/login');
  };

  return (
    <Box>
      <Button onClick={handleLoginRedirect}>Already have an account?</Button>
    </Box>
  );
};

export default Register;
