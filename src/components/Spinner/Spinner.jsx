import './Spinner.css'

export default function Spinner() {
  return (
    <div className="spinner">
      <svg className="circle-svg" height={100} width={100}>
        <circle cx={50} cy={50} r={25} />
      </svg>
    </div>)
}
