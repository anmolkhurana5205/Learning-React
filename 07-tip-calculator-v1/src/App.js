import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [youLike, setYouLike] = useState(0);
  const [heLike, setHeLike] = useState(0);
  return (
    <>
      <InputBill bill={bill} setBill={setBill} />

      <Like like={youLike} setLike={setYouLike}>
        <label>How do you like the service?</label>
      </Like>

      <Like like={heLike} setLike={setHeLike}>
        <label>How did your friend like the service?</label>
      </Like>

      <Output bill={bill} youLike={youLike} heLike={heLike} />

      <Reset
        bill={bill}
        setBill={setBill}
        setYouLike={setYouLike}
        setHeLike={setHeLike}
      />
    </>
  );
}

function InputBill({ bill, setBill }) {
  function handleOnBillChange(e) {
    setBill((bill) => e.target.value);
  }
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => handleOnBillChange(e)}
        placeholder="0"
      />
    </div>
  );
}

function Like({ like, setLike, children }) {
  return (
    <div>
      {children}
      <select value={like} onChange={(e) => setLike(e.target.value)}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, youLike, heLike }) {
  // all above thing can be avoided if i use 0, 5, 10, 20 value instead of 1, 2, 3, 4 in value property of select element. but this is also correct.
  const avg = Math.round((+bill * +youLike + +bill * +heLike) / 100 / 2);
  const totalBill = avg + Number(bill);
  return (
    bill && (
      <h3>
        You pay ${totalBill} (${bill} + ${avg} tip)
      </h3>
    )
  );
}
function Reset({ setBill, setHeLike, setYouLike, bill }) {
  function handleReset() {
    setBill("");
    setHeLike(0);
    setYouLike(0);
  }
  return bill && <button onClick={handleReset}>Reset</button>;
}
