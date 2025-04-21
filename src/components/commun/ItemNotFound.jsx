function ItemNotFound({ children = "No items found" }) {
  return (
    <div className="flex  justify-center gap-4 flex-col items-center bg-section rounded-xl shadow-sm py-20">
      <img
        src="/assets/team-not-found.svg"
        alt="team not found"
        className="w-52 h-52 lg:w-64 lg:h-64"
      />
      <h2 className="text-2xl text-muted-foreground text-center">{children}</h2>
    </div>
  );
}

export default ItemNotFound;
