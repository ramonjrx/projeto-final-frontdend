import { Link } from 'react-router-dom';

const isExternal = (href) => /^https?:\/\//.test(href);

/**
 * Coluna de informações do rodapé (README 3.2.1).
 * - title: título da coluna
 * - informations: [{ text, link? }]. Sem `link`, o item vira texto simples (ex.: Contato)
 * - itemGap: espaço extra (px) entre os itens; no Figma, Contato separa endereço e telefone
 *
 * Obs.: no PrimeFlex as classes de margem (`m-0`, `mt-3`...) são !important e anulam
 * `margin` inline. Por isso as margens daqui são todas inline, sem classe `m-*`.
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

export default FooterInfo;