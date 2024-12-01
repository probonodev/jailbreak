import React, { useState, useEffect, useRef } from "react";

import phantomLogo from "../../assets/phantom.png";
import torusLogo from "../../assets/torus.png";
import ledgerLogo from "../../assets/ledger.png";
import solflareLogo from "../../assets/solflare.png";
import slopeLogo from "../../assets/slope.png";
import solletLogo from "../../assets/sollet.png";
import Image from "next/image";

const WalletConnect = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setShowTooltip(false); // Close the tooltip
    }
  };

  useEffect(() => {
    if (showTooltip) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => document.removeEventListener("click", handleOutsideClick); // Cleanup
  }, [showTooltip]);

  const disconnectWallet = () => {
    props.setWalletAddress(null);
    props.setAllowed(false);
    setShowTooltip(false);
    localStorage.removeItem("wallet");
  };

  // Function to detect wallets
  const detectWallets = () => {
    const wallets = [];

    if (window.solana?.isPhantom) {
      wallets.push({
        name: "Phantom",
        provider: window.solana,
        logo: phantomLogo,
      });
    }

    if (window.torus) {
      wallets.push({ name: "Torus", provider: window.torus, logo: torusLogo });
    }

    // Detect Ledger Wallet
    if (window.solana?.isLedger) {
      wallets.push({
        name: "Ledger",
        provider: window.solana,
        logo: ledgerLogo,
      });
    }

    // Detect Sollet Wallet
    if (window.sollet) {
      wallets.push({
        name: "Sollet",
        provider: window.sollet,
        logo: solletLogo,
      });
    }

    // Detect Slope Wallet
    if (window.slope) {
      wallets.push({ name: "Slope", provider: window.slope, logo: slopeLogo });
    }

    // Detect Solflare Wallet
    if (window.solflare) {
      wallets.push({
        name: "Solflare",
        provider: window.solflare,
        logo: solflareLogo,
      });
    }

    // Additional wallets can be added here
    return wallets;
  };

  return (
    <div className="connectWallet">
      {/* {!props.walletAddress ? (
        <button
          onClick={() => props.setIsModalOpen(true)}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#1F0051",
            color: "#ccc",
            cursor: "pointer",
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <div className="walletMenu pointer">
          <span
            className="pointer"
            style={{
              color: "#ccc",
              textDecoration: "none",
            }}
            onClick={() => setShowTooltip((prev) => !prev)}
          >
            <strong className="pointer">
              {props.walletAddress.slice(0, 5)}
            </strong>
          </span>
          {showTooltip && (
            <div
              ref={tooltipRef}
              style={{
                position: "absolute",
                top: "2rem",
                right: "10px",
                backgroundColor: "#333",
                color: "#fff",
                padding: "0.5rem",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
              }}
            >
              <button
                onClick={disconnectWallet}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ccc",
                  cursor: "pointer",
                }}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      )} */}

      {/* Wallet Options Modal */}
      {props.isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#1F2024",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <h2>Select a Wallet</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {detectWallets().length > 0 ? (
                detectWallets().map((wallet, index) => (
                  <li
                    key={index}
                    style={{ margin: "10px 0" }}
                    className="pointer"
                    onClick={() => props.connectWallet(wallet.provider)}
                  >
                    <button
                      className="pointer"
                      style={{
                        padding: "10px 20px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "black",
                        color: "#fff",
                        cursor: "pointer",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        columnGap: "5px",
                      }}
                    >
                      <span className="pointer">
                        <Image
                          className="pointer"
                          alt={wallet.name}
                          src={wallet.logo}
                          style={{
                            width: "25px",
                            height: "auto",
                            borderRadius: "100px",
                            position: "relative",
                            top: "2px",
                          }}
                        />
                      </span>
                      <span className="pointer">{wallet.name}</span>
                    </button>
                  </li>
                ))
              ) : (
                <p>No wallets detected. Please install a Solana wallet.</p>
              )}
            </ul>
            <button
              onClick={() => props.setIsModalOpen(false)}
              style={{
                marginTop: "10px",
                padding: "10px",
                borderRadius: "80px",
                border: "none",
                backgroundColor: "#dc3545",
                color: "#fff",
                cursor: "pointer",
                width: "30px",
                height: "30px",
                position: "absolute",
                top: "10px",
                right: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
