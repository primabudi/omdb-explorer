import s from './MovieCardSkeleton.module.css'

function MovieCardSkeleton() {
  return (
    <div className={s.card} data-testid="skeleton">
      <div className={s.poster} />
      <div className={s.info}>
        <div className={s.title} />
        <div className={s.row}>
          <div className={s.year} />
          <div className={s.type} />
        </div>
      </div>
    </div>
  )
}

export default MovieCardSkeleton
