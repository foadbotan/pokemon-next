import { POKEMON_PER_PAGE, NUMBER_OF_POKEMON } from "../constants";

const NUMBER_OF_PAGES = Math.floor(NUMBER_OF_POKEMON / POKEMON_PER_PAGE);

export default function Pagination({
  handleNextPage,
  handlePreviousPage,
  nextPage,
  previousPage,
  page,
}) {
  return (
    <div className="space-x-3 flex justify-center items-center">
      <button
        className="py-2 px-3 rounded bg-green-600 disabled:bg-gray-200"
        onClick={handlePreviousPage}
        disabled={previousPage === null}
      >
        &lt;
      </button>
      <p>
        Page {page + 1} of {NUMBER_OF_PAGES + 1}
      </p>
      <button
        className="py-2 px-3 rounded bg-green-600 disabled:bg-gray-200"
        onClick={handleNextPage}
        disabled={nextPage === null}
      >
        &gt;
      </button>
    </div>
  );
}
