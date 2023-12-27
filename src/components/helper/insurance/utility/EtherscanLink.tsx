import React from 'react';

interface EtherScanProps{
  title: string,
  address: string
}

/**
 * Displays a title, the etherscan logo and the link to an address passed as properties on instantiation.
 * The etherscan link is opened in a new browser tab.
 * 
 * @param props the title for the component and the address to forward to
 * @returns the EtherscanLink component
 */
export const EtherscanLink = (props: EtherScanProps) => {
  return (
    <tr className="h-6">
      <td className="pr-4">{`${props.title}`}</td>
      <td>
        {props.address && (
          <>
            <img src="assets/img/etherscan-logo.svg" className="h-6 inline" />
            {'  '}
            <a
              href={`https://sepolia.etherscan.io/address/${props.address}`}
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.address}
            </a>
          </>
        )}
      </td>
    </tr>
  );
};