import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      
      {/* Bloque Izquierdo */}
      <div className="footer-left">
        <img src={logo} alt="logo" className="footer-logo" />

        <div>
          <h2 className="footer-title">Liga Master</h2>
          <p className="footer-copy">©LigaMaster. Todos los derechos reservados</p>
        </div>
      </div>

      {/* Bloque Atajos */}
      <div className="footer-section">
        <h3>Atajos</h3>
        <p>Liga</p>
        <p>Top</p>
      </div>

      {/* Bloque Redes */}
      <div className="footer-section">
        <h3>Redes</h3>
        <p>Facebook</p>
        <p>X</p>
      </div>

    </footer>
  );
}
