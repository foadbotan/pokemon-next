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
    <div className="grid place-content-center">
      <div className="bg-white py-2 px-5 rounded-md shadow space-x-3 flex items-center">
        <button
          className="py-1 px-3 rounded bg-green-500 disabled:bg-gray-200"
          onClick={handlePreviousPage}
          disabled={previousPage === null}
        >
          &lt;
        </button>
        <button>
          Page {page + 1} of {NUMBER_OF_PAGES}
        </button>

        <button
          className="py-1 px-3 rounded bg-green-500 disabled:bg-gray-200"
          onClick={handleNextPage}
          disabled={nextPage === null}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
