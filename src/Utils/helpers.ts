export const myLorem = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dolore eveniet nesciunt autem adipisci doloremque corrupti sequi laboriosam aperiam, nam illo blanditiis accusamus? Nostrum molestias corporis excepturi? Ipsam, perferendis reiciendis.';

export function numberWithCommas(x: number) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const asPriceNum = (num: number, digits: number = 2) => {
  return Number(num).toFixed(digits);
};

export const toUpperCase = (str: string = '') => {
  return str.at(0).toUpperCase() + str.slice(1);
};
