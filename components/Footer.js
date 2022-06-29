const Footer = () => {
  const today = new Date();

  return (
    <footer>
      <p>Copyright &copy; {today.getFullYear()} Next Blog</p>
    </footer>
  );
};

export default Footer;
