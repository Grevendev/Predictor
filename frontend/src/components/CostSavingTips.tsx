function CostSavingTips() {
  return (
    <div className="tips-content">
      <div
        className="
          card-heading
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div>
          <span
            className="
              card-eyebrow
              text-[0.68rem]
              font-bold
              tracking-[0.14em]
              text-[var(--text-subtle)]
            "
          >
            SMART ELANVÄNDNING
          </span>

          <h3
            className="
              m-0
              mt-2
              text-[1.25rem]
              tracking-[-0.02em]
              text-[var(--text)]
            "
          >
            Spara pengar
          </h3>
        </div>
      </div>

      <div
        className="
          tips-list
          mt-6
          flex
          flex-col
        "
      >
        <div
          className="
            tip
            grid
            grid-cols-[42px_1fr]
            items-start
            gap-4
            border-t
            border-[var(--border)]
            py-[18px]
            last:border-b
          "
        >
          <span
            className="
              tip-number
              flex
              h-[34px]
              w-[34px]
              items-center
              justify-center
              text-[0.72rem]
              font-extrabold
              tracking-[0.05em]
              text-[var(--text-subtle)]
            "
          >
            01
          </span>

          <p
            className="
              m-0
              text-[0.88rem]
              leading-[1.65]
              text-[var(--text-muted)]
            "
          >
            Kör tvättmaskin och diskmaskin
            under timmar då elpriset förväntas
            vara lägre.
          </p>
        </div>

        <div
          className="
            tip
            grid
            grid-cols-[42px_1fr]
            items-start
            gap-4
            border-t
            border-[var(--border)]
            py-[18px]
            last:border-b
          "
        >
          <span
            className="
              tip-number
              flex
              h-[34px]
              w-[34px]
              items-center
              justify-center
              text-[0.72rem]
              font-extrabold
              tracking-[0.05em]
              text-[var(--text-subtle)]
            "
          >
            02
          </span>

          <p
            className="
              m-0
              text-[0.88rem]
              leading-[1.65]
              text-[var(--text-muted)]
            "
          >
            Ladda elbilen under billigare
            timmar istället för under
            pristoppar.
          </p>
        </div>

        <div
          className="
            tip
            grid
            grid-cols-[42px_1fr]
            items-start
            gap-4
            border-t
            border-[var(--border)]
            py-[18px]
            last:border-b
          "
        >
          <span
            className="
              tip-number
              flex
              h-[34px]
              w-[34px]
              items-center
              justify-center
              text-[0.72rem]
              font-extrabold
              tracking-[0.05em]
              text-[var(--text-subtle)]
            "
          >
            03
          </span>

          <p
            className="
              m-0
              text-[0.88rem]
              leading-[1.65]
              text-[var(--text-muted)]
            "
          >
            Försök undvika flera stora
            elförbrukare samtidigt när priset
            är högt.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CostSavingTips;