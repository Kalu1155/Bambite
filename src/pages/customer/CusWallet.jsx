import React, { useState } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import WithdrawModal from "../../components/WithdrawModal";
import FundWalletModal from "../../components/FundWalletModal";
import TransactionDetailsModal from "../../components/TransactionDetailsModal";

import {
  RiArrowUpCircleLine,
  RiArrowDownCircleLine,
  RiRestaurantLine,
  RiRefund2Line,
  RiCheckLine,
  RiCloseCircleLine,
  RiTimeLine,
} from "react-icons/ri";

const CusWallet = () => {
  // Dummy user balance
  const balance = 14500;
  const [showFund, setShowFund] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [filter, setFilter] = useState("All");
  const [history, setHistory] = useState([
    {
      id: 1,
      type: "Order",
      title: "Order #4421",
      amount: -3500,
      date: "Nov 20 • 2:15 PM",
      icon: <RiRestaurantLine />,
      status: "Success",
    },
    {
      id: 2,
      type: "Deposit",
      title: "Wallet Top-up",
      amount: 10000,
      date: "Nov 18 • 11:20 AM",
      icon: <RiArrowDownCircleLine />,
      status: "Success",
    },
    {
      id: 3,
      type: "Refund",
      title: "Order #4350 Refund",
      amount: 2500,
      date: "Nov 16 • 4:10 PM",
      icon: <RiRefund2Line />,
      status: "Success",
    },
    {
      id: 4,
      type: "Order",
      title: "Order #4300",
      amount: -2200,
      date: "Nov 14 • 8:40 PM",
      icon: <RiRestaurantLine />,
      status: "Pending",
    },
    {
      id: 5,
      type: "Withdraw",
      title: "Withdraw #4300",
      amount: -2200,
      date: "Nov 14 • 8:40 PM",
      icon: <RiArrowUpCircleLine />,
      status: "Failed",
    },
  ]);
  const getIconByType = (type) => {
    switch (type) {
      case "Deposit":
        return <RiArrowDownCircleLine />;
      case "Withdraw":
        return <RiArrowUpCircleLine />;
      case "Order":
        return <RiRestaurantLine />;
      case "Refund":
        return <RiRefund2Line />;
      default:
        return <RiRestaurantLine />;
    }
  };
  const handleFundWallet = (amount) => {
    const newTx = {
      id: history.length + 1,
      type: "Deposit",
      title: "Wallet Top-up",
      amount: amount,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
      icon: getIconByType("Deposit"),
      status: "Success",
    };

    setHistory([newTx, ...history]);
  };
  const handleWithdraw = (amount, bank, account) => {
    const newTx = {
      id: history.length + 1,
      type: "Withdraw",
      title: `Withdraw to ${bank} (${account})`,
      amount: -amount,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
      icon: getIconByType("Withdraw"),
      status: "Success",
    };

    setHistory([newTx, ...history]);
  };

  const filteredHistory =
    filter === "All"
      ? history
      : history.filter((tx) =>
          filter === "Success" || filter === "Pending" || filter === "Failed"
            ? tx.status === filter
            : tx.type === filter
        );

  const formatMoney = (x) => x.toLocaleString("en-NG");

  return (
    <>
      <TopBar />
      <CustomerNav />

      <div className="customer-home container wallet-page">
        <h2 className="page-title">Wallet</h2>

        {/* ================= BALANCE CARD ================= */}
        <div className="wallet-balance-card">
          <p className="small-label">Current Balance</p>
          <h1>₦{formatMoney(balance)}</h1>

          <div className="wallet-actions">
            <button className="pri-btn" onClick={() => setShowFund(true)}>
              Fund Wallet
            </button>
            <button className="sec-btn" onClick={() => setShowWithdraw(true)}>
              Withdraw
            </button>
          </div>
        </div>

        {/* ================= TRANSACTION HISTORY ================= */}
        <section className="section-block">
          <h3 className="section-title">Transaction History</h3>
          <div className="tx-filters">
            {[
              "All",
              "Success",
              "Pending",
              "Failed",
              "Deposit",
              "Withdraw",
              "Order",
              "Refund",
            ].map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="transaction-list">
            {filteredHistory.map((item) => (
              <div
                className="transaction-card"
                key={item.id}
                onClick={() => {
                  setSelectedTx(item);
                  setShowDetails(true);
                }}
              >
                <div className="left">
                  <div className="icon">{getIconByType(item.type)}</div>
                  <div className="text">
                    <h4>{item.title}</h4>
                    <p>{item.date}</p>
                  </div>
                </div>

                <div className="right">
                  <span
                    className={`amount ${
                      item.amount < 0 ? "negative" : "positive"
                    }`}
                  >
                    {item.amount < 0 ? "-" : "+"}₦
                    {formatMoney(Math.abs(item.amount))}
                  </span>

                  <span
                    className={`status 
    ${item.status === "Pending" ? "pending" : ""} 
    ${item.status === "Success" ? "success" : ""} 
    ${item.status === "Failed" ? "failed" : ""}
  `}
                  >
                    {item.status === "Success" && <RiCheckLine />}
                    {item.status === "Pending" && <RiTimeLine />}
                    {item.status === "Failed" && <RiCloseCircleLine />}
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <FundWalletModal
        show={showFund}
        onClose={() => setShowFund(false)}
        onFund={handleFundWallet}
      />

      <WithdrawModal
        show={showWithdraw}
        onClose={() => setShowWithdraw(false)}
        onWithdraw={handleWithdraw}
      />

      <TransactionDetailsModal
        show={showDetails}
        onClose={() => setShowDetails(false)}
        item={selectedTx}
      />
    </>
  );
};

export default CusWallet;
