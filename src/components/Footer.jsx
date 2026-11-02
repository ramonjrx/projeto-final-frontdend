import { Link } from 'react-router-dom';
import Logo from './Logo';
import logoFooter from '../../assets/logo-footer.svg';
import facebookIcon from '../../assets/facebook.svg';
import instagramIcon from '../../assets/instagram.svg';
import twitterIcon from '../../assets/twitter.svg';

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com', icon: facebookIcon },
  { name: 'Instagram', href: 'https://www.instagram.com', icon: instagramIcon },
  { name: 'Twitter', href: 'https://twitter.com', icon: twitterIcon },
];

// Textos do Figma. As duas primeiras colunas aparecem ambas como "Informação" no frame mobile.
const INFO_COLUMNS = [
  {
    title: 'Informação',
    informations: [
      { text: 'Sobre Drip Store', link: '/about' },
      { text: 'Segurança', link: '/security' },
      { text: 'Wishlist', link: '/wishlist' },
      { text: 'Blog', link: '/blog' },
      { text: 'Trabalhe conosco', link: '/jobs' },
      { text: 'Meus Pedidos', link: '/meus-pedidos' },
    ],
  },
  {
    title: 'Informação',
    informations: [
      { text: 'Camisetas', link: '/produtos?filter=camisetas' },
      { text: 'Calças', link: '/produtos?filter=calcas' },
      { text: 'Bonés', link: '/produtos?filter=bones' },
      { text: 'Headphones', link: '/produtos?filter=headphones' },
      { text: 'Tênis', link: '/produtos?filter=tenis' },
    ],
  },
];

const CONTACT = [
  { text: 'Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161' },
  { text: '(85) 3051-3411' },
];

const isExternal = (href) => /^https?:\/\//.test(href);

/**
 * Componente de informações (README 3.2.1), definido aqui mesmo para não virar um arquivo extra.
 * - title: título da coluna
 * - informations: [{ text, link? }], renderizado dinamicamente. Sem `link`, o item vira texto
 *   simples (ex.: Contato)
 * - itemGap: espaço extra (px) entre os itens; no Figma, Contato separa endereço e telefone
 *
 * Obs.: no PrimeFlex as classes de margem/padding (`m-0`, `mt-3`, `px-5`...) são !important e
 * anulam `margin`/`padding` inline. Por isso as margens abaixo são inline, sem classe `m-*`.
 */
const FooterInfo = ({ title, informations = [], itemGap = 0 }) => (
  <section>
    <h3
      className="text-white"
      style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600, lineHeight: '24px' }}
    >
      {title}
    </h3>

    <ul
      className="flex flex-column"
      style={{ margin: 0, padding: 0, listStyle: 'none', gap: `${itemGap}px` }}
    >
      {informations.map(({ text, link }) => (
        <li key={`${text}-${link ?? ''}`} style={{ fontSize: '16px', lineHeight: '31px' }}>
          {!link ? (
            text
          ) : isExternal(link) ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="no-underline text-white">
              {text}
            </a>
          ) : (
            <Link to={link} className="no-underline text-white">
              {text}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </section>
);

const Footer = () => (
  <footer style={{ backgroundColor: 'var(--dark-gray)', color: 'var(--white)' }}>
    {/* Mobile: 20px de margem lateral (Figma). Desktop: `lg:px-5` (!important) vence o inline e
        usa o mesmo respiro lateral do Header, mantendo as duas bordas alinhadas. */}
    <div className="lg:px-5" style={{ padding: '50px 20px 48px' }}>
      <div className="flex flex-column lg:flex-row" style={{ gap: '48px' }}>
        {/* Marca */}
        <div className="lg:w-4" style={{ maxWidth: '307px' }}>
          {/* Mobile: 168x25 (Figma). Desktop: tamanho padrão do Logo (README 3.1.1) */}
          <div className="lg:hidden">
            <Logo src={logoFooter} width={168} height={25} />
          </div>
          <div className="hidden lg:block">
            <Logo src={logoFooter} />
          </div>

          <p style={{ margin: '24px 0 0', fontFamily: 'inherit', fontSize: '14px', lineHeight: '22px', fontWeight: 500 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore.
          </p>

          <ul
            className="flex align-items-center"
            style={{ margin: '32px 0 0', padding: 0, listStyle: 'none', gap: '30px' }}
          >
            {SOCIAL_LINKS.map(({ name, href, icon }) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="flex">
                  <img src={icon} alt="" style={{ width: '20px', height: '20px', display: 'block' }} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Duas colunas lado a lado, inclusive no mobile */}
        <div className="flex lg:flex-1" style={{ gap: '16px' }}>
          {INFO_COLUMNS.map(({ title, informations }, index) => (
            <div key={`${title}-${index}`} className="flex-1">
              <FooterInfo title={title} informations={informations} />
            </div>
          ))}
        </div>

        {/* Contato */}
        <div className="lg:w-4">
          <FooterInfo title="Contato" informations={CONTACT} itemGap={31} />
        </div>
      </div>

      <hr style={{ border: 0, borderTop: '1px solid var(--dark-gray-3)', margin: '48px 6px 32px' }} />

      <p style={{ margin: 0, fontFamily: 'inherit', fontSize: '12px', textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} Digital Store
      </p>
    </div>
  </footer>
);

export default Footer;