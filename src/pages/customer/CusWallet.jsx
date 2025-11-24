import React, { useState } from "react";
import TopBar from "./customerComponent/TopBar";
import CustomerNav from "./customerComponent/CustomerNav";
import WithdrawModal from "../../components/WithdrawModal";
import FundWalletModal from "../../components/FundWalletModal";
import TransactionDetailsModal from "../../components/TransactionDetailsModal";
import { Link } from "react-router-dom";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
  // Convert history date to real JS Date
  const parseDate = (dateStr) => {
    try {
      return new Date(dateStr.replace("•", ""));
    } catch {
      return new Date();
    }
  };

  // 2️⃣ STATUS/TYPE FILTER

  // Filter by date range
  const dateFilteredHistory = history.filter((tx) => {
    const txDate = parseDate(tx.date);

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate + " 23:59") : null;

    if (start && txDate < start) return false;
    if (end && txDate > end) return false;

    return true;
  });

  // 2️⃣ STATUS/TYPE FILTER
  const statusFiltered =
    filter === "All"
      ? dateFilteredHistory
      : dateFilteredHistory.filter((tx) =>
          filter === "Success" || filter === "Pending" || filter === "Failed"
            ? tx.status === filter
            : tx.type === filter
        );

  // 3️⃣ PAGINATION
  const totalPages = Math.ceil(statusFiltered.length / itemsPerPage);

  const paginatedHistory = statusFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page changes
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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

  // // Status/Type Filter
  // const statusFiltered =
  //   filter === "All"
  //     ? dateFilteredHistory
  //     : dateFilteredHistory.filter((tx) =>
  //         filter === "Success" || filter === "Pending" || filter === "Failed"
  //           ? tx.status === filter
  //           : tx.type === filter
  //       );

  const formatMoney = (x) => x.toLocaleString("en-NG");

  return (
    <>
      <TopBar />
      <CustomerNav />

      <div className="customer-home container wallet-page">
        <div className="wallet-title-row">
          <h2 className="page-title">Wallet</h2>
          <Link to="/cus-walletsettings" className="wallet-settings-btn">
            ⚙ Wallet Settings
          </Link>
        </div>

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
          <div className="date-filters">
            <div>
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="transaction-list">
            {paginatedHistory.map((item) => (
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
        <div className="pagination-controls">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
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
