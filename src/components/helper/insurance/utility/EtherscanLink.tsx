import React from 'react';

interface EtherScanProps{
  title: string,
  address: string
}

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