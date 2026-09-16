function Footer() {
  return (
    <footer
      className="
        mt-auto
        w-full
        border-t
        border-[var(--border)]
        bg-[var(--surface)]
        px-10
        py-8
        transition
        duration-200
        ease-in-out
        max-[600px]:px-5
        max-[600px]:py-7
      "
    >
      <p
        className="
          mx-auto
          w-full
          max-w-[1120px]
          m-0
          text-center
          text-[0.875rem]
          text-[var(--text-subtle)]
        "
      >
        Electricity Predictor
      </p>
    </footer>
  );
}

export default Footer;