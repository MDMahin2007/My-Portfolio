import { profile } from '../data'

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <a className="wordmark" href="#home">
          <img className="brand-logo" src="/images/icons/logo.svg" alt="" />
          <span>
            ahin<span className="wordmark-dot">.</span>dev
          </span>
        </a>
        <p>
          Turning ideas into thoughtful 
          <br />
          digital experiences.
        </p>
        <div
          className="footer-socials"
          aria-label="Social and freelance profiles"
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            GH
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            IG
          </a>
          <a
            href={profile.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            FB
          </a>
          <a
            href={profile.upwork}
            target="_blank"
            rel="noreferrer"
            aria-label="Upwork"
          >
            UP
          </a>
          <a
            href={profile.fiverr}
            target="_blank"
            rel="noreferrer"
            aria-label="Fiverr"
          >
            FI
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            @
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {currentYear} {profile.name}
        </span>
        <span>Dhaka, Bangladesh ↗</span>
      </div>
    </footer>
  );
}

export default Footer
