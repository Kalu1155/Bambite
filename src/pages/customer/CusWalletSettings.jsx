import React, { useState } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import {
  RiAddLine,
  RiDeleteBin6Line,
  RiCheckLine,
  RiShieldKeyholeLine,
  RiLockPasswordLine,
  RiBankLine,
  RiShakeHandsLine,
} from "react-icons/ri";
import AddBankModal from "./customerComponent/AddBankModal";

const CusWalletSettings = () => {
  const navigate = useNavigate();
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bank: "GTBank",
      number: "012******44",
      primary: true,
    },
    {
      id: 2,
      bank: "Access Bank",
      number: "008******21",
      primary: false,
    },
  ]);
  const [autoFund, setAutoFund] = useState(false);
  const [autoFundAmount, setAutoFundAmount] = useState(2000);
  const [minBalance, setMinBalance] = useState(500);
  const [showAddBank, setShowAddBank] = useState(false);

  function goBack() {
    navigate(-1); // goes back to where the user came from
  }
  const togglePrimary = (id) => {
    setBankAccounts((prev) =>
      prev.map((acc) => ({
        ...acc,
        primary: acc.id === id,
      }))
    );
  };

  const deleteBank = (id) => {
    setBankAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  return (
    <>
      <TopBar />
      <CustomerNav />

      <div className="customer-home container wallet-settings-page">
        <div className="settings-title-row">
          <h2>Wallet Settings</h2>
        </div>
        <button className="back-floating-btn" onClick={goBack}>
          <IoArrowBack size={24} />
        </button>

        {/* ============= BANK ACCOUNTS ============= */}
        <section className="settings-section">
          <h3>
            <RiBankLine /> Bank Accounts
          </h3>

          <div className="bank-list">
            {bankAccounts.map((acc) => (
              <div className="bank-card" key={acc.id}>
                <div className="left">
                  <h4>{acc.bank}</h4>
                  <p>{acc.number}</p>

                  {acc.primary && (
                    <span className="primary-tag">
                      <RiCheckLine /> Primary
                    </span>
                  )}
                </div>

                <div className="right">
                  {!acc.primary && (
                    <button
                      className="small-btn"
                      onClick={() => togglePrimary(acc.id)}
                    >
                      Make Primary
                    </button>
                  )}

                  <button
                    className="icon-btn delete"
                    onClick={() => deleteBank(acc.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))}

            <button
              className="add-bank-btn"
              onClick={() => setShowAddBank(true)}
            >
              <RiAddLine /> Add Bank Account
            </button>
          </div>
        </section>

        {/* ============= SECURITY SETTINGS ============= */}
        <section className="settings-section">
          <h3>
            <RiShieldKeyholeLine /> Security Settings
          </h3>

          <div className="security-options">
            <button className="sec-action-btn">
              <RiLockPasswordLine />
              Change Wallet PIN
            </button>

            <label className="toggle-row">
              <span>Transaction Notifications</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="toggle-row">
              <span>Enable 2FA</span>
              <input type="checkbox" defaultChecked />
            </label>
          </div>
        </section>

        {/* ============= AUTO FUNDING ============= */}
        <section className="settings-section">
          <h3>
            <RiShakeHandsLine /> Auto Funding
          </h3>

          <label className="toggle-row">
            <span>Enable Auto-Fund</span>
            <input
              type="checkbox"
              checked={autoFund}
              onChange={() => setAutoFund(!autoFund)}
            />
          </label>

          {autoFund && (
            <div className="auto-fund-inputs">
              <div>
                <p>Minimum Balance Trigger</p>
                <input
                  type="number"
                  value={minBalance}
                  onChange={(e) => setMinBalance(e.target.value)}
                />
              </div>

              <div>
                <p>Auto-Fund Amount</p>
                <input
                  type="number"
                  value={autoFundAmount}
                  onChange={(e) => setAutoFundAmount(e.target.value)}
                />
              </div>
            </div>
          )}
        </section>

        {/* ============= CLOSE ACCOUNT ============= */}
        <section className="settings-section danger-zone">
          <h3>Danger Zone</h3>

          <button className="danger-btn">
            <RiDeleteBin6Line /> Close Wallet Account
          </button>
        </section>
      </div>
      <AddBankModal
        show={showAddBank}
        onClose={() => setShowAddBank(false)}
        onAdd={(newBank) => setBankAccounts([...bankAccounts, newBank])}
      />
    </>
  );
};

export default CusWalletSettings;
