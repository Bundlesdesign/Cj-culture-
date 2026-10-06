import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AtelierBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export const AtelierBreadcrumb: React.FC<AtelierBreadcrumbProps> = ({
  items,
  className = '',
  showHomeIcon = true
}) => {
  const currentOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://ctcollections.com';

  // Build Schema.org BreadcrumbList structured data (JSON-LD)
  const schemaBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href
        ? item.href.startsWith('http')
          ? item.href
          : `${currentOrigin}${item.href}`
        : `${currentOrigin}${window.location.pathname}`
    }))
  };

  return (
    <>
      {/* Schema.org JSON-LD Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />

      {/* Semantic Nav with Microdata */}
      <nav
        aria-label="Breadcrumb"
        className={`w-full py-3.5 text-xs text-neutral-500 ${className}`}
      >
        <ol
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          className="flex flex-wrap items-center gap-1.5 sm:gap-2 leading-none"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const itemPosition = index + 1;
            const fullUrl = item.href
              ? item.href.startsWith('http')
                ? item.href
                : `${currentOrigin}${item.href}`
              : undefined;

            return (
              <li
                key={`${item.label}-${index}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="inline-flex items-center gap-1.5 sm:gap-2"
              >
                <meta itemProp="position" content={String(itemPosition)} />

                {/* If item has a link and is not the current page */}
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    itemProp="item"
                    className="inline-flex items-center gap-1 text-neutral-500 hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                  >
                    {index === 0 && showHomeIcon && (
                      <Home size={13} className="text-neutral-400 group-hover:text-[#D4AF37]" />
                    )}
                    <span itemProp="name" className="font-light">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  // Current active item / terminal leaf
                  <span
                    aria-current="page"
                    itemProp="name"
                    className="font-medium text-neutral-900 truncate max-w-[220px] sm:max-w-md"
                  >
                    {item.label}
                  </span>
                )}

                {/* Separator */}
                {!isLast && (
                  <ChevronRight
                    size={12}
                    className="text-neutral-300 flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default AtelierBreadcrumb;
