export default function Preloader({ visible }) {
  return (
    <div className={`preloader ${!visible ? 'hidden' : ''}`}>
      <div className="preloader-inner">
        <div className="preloader-spinner"></div>
        <p className="preloader-text">Future Point</p>
      </div>
    </div>
  )
}
