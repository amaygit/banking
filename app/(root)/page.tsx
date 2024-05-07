import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalancebox";
import HeaderBox from "@/components/ui/HeaderBox";
import React from "react";

const Home = () => {
  const loggedIn = { firstName: "Amay",lastName:'Nayak',email:'amaynayak08@gmail.com' };
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transaction efficiently."
          />
          <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250}
          />
        </header>
        RECENT TRANSACTION
      </div>
      <RightSidebar 
      user={loggedIn}
      transactions={[]}
      banks={[{currentBalance:1500},{currentBalance:3500}]}
      />
    </section>
  );
};

export default Home;
