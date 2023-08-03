import { Address, toNano } from "locklift";


//TO DEPLOY THIS CONTRACT RUN - npx locklift run -s scripts/deploy_collection.ts --network venom_testnet
async function main() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    const nftArtifacts = await locklift.factory.getContractArtifacts("Nft");
    const indexArtifacts = await locklift.factory.getContractArtifacts("Index");
    const indexBasisArtifacts = await locklift.factory.getContractArtifacts("IndexBasis");
    
    const { contract: sample, tx } = await locklift.factory.deployContract({
      contract: "Collection",
      publicKey: signer.publicKey,
      initParams: {},
      constructorParams: {
          codeNft: nftArtifacts.code,
          codeIndex: indexArtifacts.code,
          codeIndexBasis: indexBasisArtifacts.code,          
          ownerPubkey: signer.publicKey,
          json: `{
            "type": "Venom Network | Testnet",
            "name": "Venomart Passes",
            "description": "Exclusive Passes On Venomart Marketplace",
            "preview": {
              "source": "https://ipfs.io/ipfs/QmNRgw61q81mUb2dRarA6NBFqdE3E9rsYYhRWfdfgcPMnL/earlypass.gif",
              "mimetype": "image/gif"
            },
            "files": [
              {
                "source": "https://ipfs.io/ipfs/QmNRgw61q81mUb2dRarA6NBFqdE3E9rsYYhRWfdfgcPMnL/earlypass.gif",
                "mimetype": "image/gif"
              }
            ],
            "external_url": "https://venomart.space"
          }`,
          mintingFee: toNano(0.1),
          withdrawalAddress: new Address("0:bf6adad7315850d05e010c55ea46f84e0aecfb4788783a31fc0694a7a6436883"),
          methodsCallsFee: toNano(0.1),
          minimalGasAmount: toNano(0.1),
          leftOnCollection: toNano(0.1),
          author: new Address("0:bf6adad7315850d05e010c55ea46f84e0aecfb4788783a31fc0694a7a6436883"),
          sendGasTo: new Address("0:bf6adad7315850d05e010c55ea46f84e0aecfb4788783a31fc0694a7a6436883"),
          isProtected: false
      },
      value: locklift.utils.toNano(1),
    });
  
    console.log(`Collection deployed at: ${sample.address.toString()}`);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(e => {
      console.log(e);
      process.exit(1);
    });
  