import { useState } from "react";

const RaiseTicket = () => {
  return (
    <>
      <h1>Raise New Ticket</h1>

      <form>
        <input type="text" placeholder="Subject" required />
        <textarea placeholder="Describe your issue" required></textarea>
        <select>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button type="submit">Submit Ticket</button>
      </form>
    </>
  );
};

export default RaiseTicket;

