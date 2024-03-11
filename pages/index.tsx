import {
  ConnectWallet,
  useContract,
  useContractRead,
  useAddress,
  Web3Button,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import { NextPage } from "next";

const Home: NextPage = () => {
  const nftDropAddress = "0xd1cb20D62D9b6a4828d5dBfd29fB0A82d0081736";
  const editionDropAddress = "0xcBC93b9F21550E51Ff997b0aA908014B2526ebdb";
  const tokenAddress = "0x9E56098548c4fafF5b005cAbB9dF7E1AfAD38788";

  // get wallet address of the connected wallet
  const address = useAddress();

  // 2. get contract instance
  const { contract: nftDropContract } = useContract(nftDropAddress);
  const { contract: editionDropContract } = useContract(editionDropAddress);
  const { contract: tokenContract } = useContract(tokenAddress);

  // get read function "totalMinted" from the contract
  const { data: nftDropTotalMinted, isLoading: nftDropTotalMintedIsLoading } =
    useContractRead(nftDropContract, "totalMinted");

  const {
    data: editionDropTotalMinted,
    isLoading: editionDropTotalMintedIsloading,
  } = useContractRead(editionDropContract, "totalSupply", [0]);

  const { data: tokenBalance, isLoading: tokenBalanceIsLoading } =
    useContractRead(tokenContract, "balanceOf", [address]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.connect}>
          <ConnectWallet />
          {/* ERC721 shown the contract information on app */}
          <h1>zkSync Era App</h1>
          {nftDropTotalMintedIsLoading ? (
            <p>Loading...</p>
          ) : (
            <p>Total NFTs minted: {nftDropTotalMinted?.toNumber()}</p>
          )}
          {/* interaction, type of contract */}
          <Web3Button
            contractAddress={nftDropAddress}
            action={(contract) => contract.erc721.claim(1)}
          >
            Claim NFT Drop
          </Web3Button>
          <br />
          {editionDropTotalMintedIsloading ? (
            <p>Loading...</p>
          ) : (
            <p>Total NFTs minted: {editionDropTotalMinted.toNumber()}</p>
          )}
          {/* erc1155(tokenId, amount) */}
          <Web3Button
            contractAddress={editionDropAddress}
            action={(contract) => contract.erc1155.claim(0, 1)}
          >
            Claim Edition NFT
          </Web3Button>
          {/* erc20 */}

          <br />
          {tokenBalanceIsLoading ? (
            <p>Loading...</p>
          ) : (
            <p>Token balance: {ethers.utils.formatUnits(tokenBalance, 18)}</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
