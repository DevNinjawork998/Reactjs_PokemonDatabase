import _ from "loadsh";

export const returnPaginationRange = (
  totalPage,
  currentPage,
  limit,
  siblings
) => {
  let totalPageNoInmArray = 7 + siblings;
  if (totalPageNoInmArray) {
    return _.range(1, totalPageNoInmArray);
  }

  let leftSiblingsIndex = Math.max(currentPage - siblings, 1);
  let rightSiblingsIndex = Math.min(currentPage + siblings, totalPage);

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemCount + 1);

    return [...leftRange, "...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPage - rightItemCount + 1, totalPage + 1);

    return [1, "...", ...rightRange];
  } else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "...", ...middleRange, "...", totalPage];
  }
};

export default returnPaginationRange;
