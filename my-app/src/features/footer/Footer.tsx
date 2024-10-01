function Footer() {
   
    return (
      <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"></link>
     <footer className="footer">
        <div className="footer-container">
            <div className="footer-row">
                {/* <div className="footer-col">
                    <h4>Navigo</h4>
                    <ul>
                        <li><a href="index.php">Faqja Kryesore</a></li>
                        <li><a href="products.php">Produktet</a></li>
                        <li><a href="aboutUs.php">Rreth nesh</a></li>
                        <li><a href="news.php">Të rejat</a></li>
                    </ul>
                </div> */}
                <div className="footer-col" id="contact">
                    <h4>Na kontaktoni</h4>
                    <ul>
                        <li>Info: biblioteka@biblo.com</li>
                        <li>Numri Kontaktues: +38349900900</li>
                        <li>HQ Address:Lagjja Kalabria, 10000 Prishtinë, Kosovë</li>
                    </ul>
                </div>

                <div className="footer-col" id="socials">
                    <h4>Na ndiqni</h4>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer-secondrow">
            <label>© Biblioteka</label>
            </div>
   </footer>
      </>
    );
  }
  
  export default Footer;
  