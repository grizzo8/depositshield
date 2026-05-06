"use client";
import { useState } from "react";
import { FileText, Plus, Trash2, Lock, Download, AlertTriangle, ShieldCheck, ChevronRight } from "lucide-react";

export default function DepositShield() {
  const [step, setStep] = useState(1); // 1 = Form, 2 = Paywall Preview
  
  const [tenantName, setTenantName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  
  // Dynamic list of damages/deductions
  const [deductions, setDeductions] = useState([
    { id: 1, description: "", amount: "" }
  ]);

  const addDeduction = () => {
    setDeductions([...deductions, { id: Date.now(), description: "", amount: "" }]);
  };

  const removeDeduction = (id) => {
    setDeductions(deductions.filter(d => d.id !== id));
  };

  const updateDeduction = (id, field, value) => {
    setDeductions(deductions.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  // Math Calculations
  const totalDeductions = deductions.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const refundAmount = (parseFloat(depositAmount) || 0) - totalDeductions;

  const handleGenerate = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* HEADER */}
      <nav className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-black tracking-wide">DepositShield<span className="text-blue-400">PRO</span></h1>
        </div>
        <p className="hidden md:block text-slate-400 font-medium text-sm">Landlord Legal Document Generator</p>
      </nav>

      <main className="max-w-4xl mx-auto py-12 px-4">
        
        {/* STEP 1: THE INTAKE FORM */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Generate Your Security Deposit Letter</h2>
              <p className="text-lg text-slate-600">Avoid tenant lawsuits. Itemize damages and generate a legally compliant deduction notice in 60 seconds.</p>
            </div>

            <form onSubmit={handleGenerate} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200">
              
              {/* Basic Info */}
              <div className="mb-10">
                <h3 className="text-xl font-bold border-b pb-2 mb-6 flex items-center"><FileText className="w-5 h-5 mr-2 text-blue-600"/> Lease Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tenant's Full Name</label>
                    <input required type="text" value={tenantName} onChange={e => setTenantName(e.target.value)} placeholder="e.g., John Doe" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Original Deposit Amount ($)</label>
                    <input required type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} placeholder="e.g., 1500" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Property Address</label>
                    <input required type="text" value={propertyAddress} onChange={e => setPropertyAddress(e.target.value)} placeholder="e.g., 123 Main St, Apt 4B, Austin, TX 75001" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition" />
                  </div>
                </div>
              </div>

              {/* Deductions Section */}
              <div className="mb-10">
                <div className="flex justify-between items-end border-b pb-2 mb-6">
                  <h3 className="text-xl font-bold flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-orange-500"/> Itemized Deductions</h3>
                  <button type="button" onClick={addDeduction} className="text-sm font-bold text-blue-600 flex items-center hover:text-blue-800 transition"><Plus className="w-4 h-4 mr-1"/> Add Item</button>
                </div>
                
                <div className="space-y-4">
                  {deductions.map((item, index) => (
                    <div key={item.id} className="flex space-x-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex-grow">
                        <input required type="text" value={item.description} onChange={e => updateDeduction(item.id, "description", e.target.value)} placeholder="Damage description (e.g., Carpet cleaning)" className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                      </div>
                      <div className="w-32">
                        <input required type="number" value={item.amount} onChange={e => updateDeduction(item.id, "amount", e.target.value)} placeholder="Cost ($)" className="w-full p-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                      </div>
                      {deductions.length > 1 && (
                        <button type="button" onClick={() => removeDeduction(item.id)} className="p-3 text-red-400 hover:text-red-600 transition"><Trash2 className="w-5 h-5"/></button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Math Summary */}
              <div className="bg-slate-900 text-white p-6 rounded-xl mb-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <p className="text-slate-400 text-sm font-medium">Total Deductions</p>
                  <p className="text-2xl font-bold text-orange-400">${totalDeductions.toFixed(2)}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-slate-400 text-sm font-medium">Final Refund to Tenant</p>
                  <p className={`text-3xl font-black ${refundAmount < 0 ? "text-red-400" : "text-green-400"}`}>
                    ${refundAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-5 rounded-xl flex justify-center items-center transition shadow-lg hover:shadow-blue-600/30">
                Generate Legal Document <ChevronRight className="w-6 h-6 ml-2" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: THE PAYWALL (THE TRAP) */}
        {step === 2 && (
          <div className="relative">
            <button onClick={() => setStep(1)} className="text-slate-500 font-bold hover:text-slate-800 mb-6 flex items-center">← Edit Details</button>
            
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative">
              
              {/* THE BLURRED DOCUMENT PREVIEW */}
              <div className="p-10 filter blur-[6px] select-none opacity-60">
                <div className="border-b-2 border-slate-900 pb-6 mb-6">
                  <h1 className="text-3xl font-serif font-black uppercase">Notice of Security Deposit Deduction</h1>
                  <p className="text-slate-600 mt-2">Date: {new Date().toLocaleDateString()}</p>
                </div>
                <p className="mb-6 font-serif"><strong>To:</strong> {tenantName || "Tenant Name"}</p>
                <p className="mb-6 font-serif"><strong>Regarding Property:</strong> {propertyAddress || "Property Address"}</p>
                <p className="mb-6 font-serif leading-relaxed">This letter serves as official notice regarding your security deposit in the amount of <strong>${parseFloat(depositAmount || 0).toFixed(2)}</strong>. Following your move-out inspection, we have identified damages that exceed standard wear and tear. As per state law, the following deductions have been made:</p>
                
                <table className="w-full mb-8 font-serif border-collapse">
                  <tbody>
                    {deductions.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-200">
                        <td className="py-3">{item.description || "Damage item"}</td>
                        <td className="py-3 text-right text-red-600 font-bold">${parseFloat(item.amount || 0).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-100 font-bold">
                      <td className="py-4 px-2">Total Deductions:</td>
                      <td className="py-4 px-2 text-right">${totalDeductions.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-slate-200 font-black text-lg">
                      <td className="py-4 px-2">Final Refund Due:</td>
                      <td className="py-4 px-2 text-right">${refundAmount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="font-serif leading-relaxed">A check for the remaining balance has been issued. If you have any questions regarding these deductions, please reply in writing within 15 days.</p>
              </div>

              {/* THE PAYWALL OVERLAY */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm p-6 text-center">
                <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border border-slate-100 transform scale-105">
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Lock className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Document Ready!</h2>
                  <p className="text-slate-600 mb-8">Your legal deduction letter has been formatted and the math has been verified. Unlock the high-resolution PDF now to print or email to your tenant.</p>
                  
                  {/* FAKE STRIPE CHECKOUT BUTTON */}
                  <button onClick={() => alert("This would redirect to your Square or Stripe payment link for $9.00!")} className="w-full bg-slate-900 hover:bg-black text-white font-black text-xl py-5 rounded-xl shadow-xl flex justify-center items-center transition hover:scale-105">
                    <Download className="w-6 h-6 mr-2" /> Unlock PDF - $9.00
                  </button>
                  <p className="text-xs text-slate-400 mt-4 font-medium flex items-center justify-center"><ShieldCheck className="w-4 h-4 mr-1"/> Secure checkout via Stripe</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
