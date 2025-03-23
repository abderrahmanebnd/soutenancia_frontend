function SectionTitle({ title, subTitle }) {
  return (
    <div className="col-span-2 ">
      <h1 className="font-semibold text-xl text-primary">{title}</h1>
      <h3 className="text-muted-foreground text-sm hidden md:block">
        {subTitle}
      </h3>
    </div>
  );
}

export default SectionTitle;
