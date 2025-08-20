const people = [
  { name: "Anna", location: "Stockholm", hobby: "Skater" },
  { name: "Lisa", location: "Luelå", hobby: "Sammla frimärken" },
  { name: "Johanna", location: "Göteborg", hobby: "Skater" },
  { name: "Nils", location: "Stockholm", hobby: "Sammla frimärken" },
  { name: "Martina", location: "Göteborg", hobby: "Trädgård" },
  { name: "Niklas", location: "Luelå", hobby: "Trädgård" },
  { name: "Markus", location: "Göteborg", hobby: "Trädgård" },
];

console.log("array:", people);

const sortedLocation = [...people].sort((a, b) =>
  a.location.localeCompare(b.location)
);

console.log("sorted location:", sortedLocation);
