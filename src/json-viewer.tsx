import React from 'react';

export default function JsonViewer({
  json,
  clickableLinks,
  onLinkClick,
}: {
  json: object;
  clickableLinks: boolean;
  onLinkClick?: (url: string) => void;
}) {
  if (json == null) {
    return null;
  }

  const keyQuoteClass = 'dark:text-blue-300 text-blue-700';
  const punctuationClass = 'dark:text-blue-100 text-blue-900 pr-1';
  const keyClass = 'dark:text-blue-300 text-blue-700';

  const valueQuoteClass = 'dark:text-green-300 text-green-700';
  const valueStringClass = 'dark:text-green-300 text-green-700';
  const valueNumberClass = 'dark:text-green-300 text-green-700';
  const valueBooleanClass = 'dark:text-green-300 text-green-700';
  const valueNullClass = 'dark:text-green-300 text-green-700';

  const linkClass =
    'dark:text-green-300 text-green-700 hover:underline dark:hover:text-blue-300 hover:text-blue-700 cursor-pointer';

  function Value({ value }: { value: any }) {
    if (typeof value === 'string') {
      return (
        <>
          <span className={valueQuoteClass}>&quot;</span>
          {value.startsWith('https://') && clickableLinks ? (
            <a className={linkClass} onClick={() => onLinkClick(value)}>
              {value}
            </a>
          ) : (
            <span className={valueStringClass}>{value}</span>
          )}
          <span className={valueQuoteClass}>&quot;</span>
        </>
      );
    } else if (typeof value === 'number') {
      return <span className={valueNumberClass}>{value}</span>;
    } else if (typeof value === 'boolean') {
      return <span className={valueBooleanClass}>{value.toString()}</span>;
    } else if (value === null) {
      return <span className={valueNullClass}>null</span>;
    } else if (Array.isArray(value)) {
      return (
        <>
          <span className={punctuationClass}>[</span>
          <div className='pl-4'>
            {value.map((v, i) => (
              <div key={i}>
                <Value value={v} />
                {i < value.length - 1 && <span className={punctuationClass}>,</span>}
              </div>
            ))}
          </div>
          <span className={punctuationClass}>]</span>
        </>
      );
    } else if (typeof value === 'object') {
      const entries = Object.entries(value);
      return (
        <>
          <span className={punctuationClass}>{'{'}</span>
          <div className='pl-4'>
            {entries.map(([key, value], i) => {
              return (
                <div key={key}>
                  <span className={keyQuoteClass}>&quot;</span>
                  <span className={keyClass}>{key}</span>
                  <span className={keyQuoteClass}>&quot;</span>
                  <span className={punctuationClass}>:</span>
                  <Value value={value} />
                  {i < entries.length - 1 && <span className={punctuationClass}>,</span>}
                </div>
              );
            })}
          </div>
          <span className={punctuationClass}>{'}'}</span>
        </>
      );
    }
    return null;
  }

  return (
    <div className='font-mono dark:bg-[#282c37] bg-[#eff3f5]'>
      <Value value={json} />
    </div>
  );
}
