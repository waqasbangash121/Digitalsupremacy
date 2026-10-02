export function ServiceVisual({ type }: { type: string }) {
  const flow = type === "flows" || type === "strategy" || type === "platform";
  const shield = type === "deliverability";
  const chart = type === "reporting";
  return <div className="sd-service-visual" aria-hidden="true"><svg viewBox="0 0 240 170" fill="none">
    <rect x="12" y="12" width="216" height="146" rx="8" fill="white" stroke="#dedee3" />
    <path d="M12 35h216" stroke="#dedee3" />
    <circle cx="25" cy="24" r="3" fill="#c1121f" /><circle cx="36" cy="24" r="3" fill="#dedee3" /><circle cx="47" cy="24" r="3" fill="#dedee3" />
    {flow ? <g stroke="#c1121f" strokeWidth="1.5"><path d="M120 74v23M62 114V97h116v17" /><rect x="94" y="49" width="52" height="25" rx="4" fill="#f9eaec" /><rect x="36" y="114" width="52" height="25" rx="4" fill="#f9eaec" /><rect x="152" y="114" width="52" height="25" rx="4" fill="#f9eaec" /><path d="M109 62h22M51 127h22M167 127h22" /></g> : shield ? <g stroke="#27745d" strokeWidth="2"><path d="m120 51 37 13v26c0 27-37 49-37 49S83 117 83 90V64z" fill="#eaf3ef" /><path d="m104 91 11 11 23-25" /></g> : chart ? <g><path d="M40 135h161M40 52v83" stroke="#dedee3" /><path d="m47 120 30-13 27 5 29-33 27 4 36-29" stroke="#c1121f" strokeWidth="3" /><path d="m47 120 30-13 27 5 29-33 27 4 36-29v80H47z" fill="#c1121f" fillOpacity=".08" /></g> : <g>{[44,98,152].map((x,index) => <g key={x}><rect x={x} y="51" width="44" height="86" rx="4" fill={index === 1 ? "#f9eaec" : "#f5f5f7"} stroke="#dedee3" /><rect x={x+7} y="61" width="30" height="25" rx="2" fill={index === 1 ? "#c1121f" : "#dedee3"} /><path d={`M${x+7} 96h30m-30 8h22m-22 8h27`} stroke="#9999a3" /><rect x={x+7} y="122" width="23" height="5" rx="2" fill="#c1121f" /></g>)}</g>}
  </svg></div>;
}
