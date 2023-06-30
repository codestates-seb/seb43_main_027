function SimpleDateTimeFormat(date, pattern) {
  const dateString = pattern.replace(/(yyyy|MM|dd|HH|mm|ss|SSS)/g, (match) => {
    let matchString = '';
    switch (match) {
      case 'yyyy':
        matchString = date.getFullYear();
        break;
      case 'MM':
        matchString = date.getMonth() + 1;
        break;
      case 'dd':
        matchString = date.getDate();
        break;
      case 'HH':
        matchString = date.getHours();
        break;
      case 'mm':
        matchString = date.getMinutes();
        break;
      case 'ss':
        matchString = date.getSeconds();
        break;
      case 'SSS':
        matchString = date.getMilliseconds();
        break;
      default:
        matchString = match;
        break;
    }
    if (match === 'SSS') {
      if (matchString < 10) {
        matchString = `00${matchString}`;
      } else if (matchString < 100) {
        matchString = `0${matchString}`;
      }
    } else if (typeof matchString === 'number' && matchString < 10) {
      matchString = `0${matchString}`;
    }
    return matchString;
  });

  return dateString;
}

export function elapsedText(date) {
  // 초 (밀리초)
  const seconds = 1;
  // 분
  const minute = seconds * 60;
  // 시
  const hour = minute * 60;
  // 일
  const day = hour * 24;

  const today = new Date();
  const elapsedTime = Math.trunc((today.getTime() - date.getTime()) / 1000);

  let elapsedText = '';
  if (elapsedTime < seconds) {
    elapsedText = '방금 전';
  } else if (elapsedTime < minute) {
    elapsedText = `${elapsedTime}초 전`;
  } else if (elapsedTime < hour) {
    elapsedText = `${Math.trunc(elapsedTime / minute)}분 전`;
  } else if (elapsedTime < day) {
    elapsedText = `${Math.trunc(elapsedTime / hour)}시간 전`;
  } else if (elapsedTime < day * 15) {
    elapsedText = `${Math.trunc(elapsedTime / day)}일 전`;
  } else {
    elapsedText = SimpleDateTimeFormat(date, 'yyyy.mm.dd');
  }

  return elapsedText;
}

// 매개변수로 들어온 날짜 ~ 오늘까지 경과한 날짜(일, 월, 연도)를 반환하는 함수
/* eslint-disable */
export function getDays(dateObj) {
  if (dateObj === undefined) return '--';
  const date = new Date(dateObj.replace(/"/g, "'"));
  const now = new Date();
  const days = Math.floor((now.getTime() - date.getTime()) / 8.64e7);
  // 31일 미만은 날짜 단위로 반환
  if (days < 31) {
    if (days <= 0) {
      return 'today';
    } else if (days === 1) {
      return 'yesterday';
    } else {
      return `${days} days ago`;
    }
  }

  // 12달 미만은 개월 단위로 반환
  const months = Math.floor(days / 30);
  if (months < 12) return months + (months === 1 ? 'month ago' : 'months ago');

  // 그 이상은 연도 수와 개월 수(연도 계산하고 남은 개월 수가 0 이상일 때)를 반환
  const years = Math.floor(months / 12); // 연도 계산
  const monthsLeft = Math.floor(months % 12); // 그 후 남은 개월수

  let yearsAndMonth = years + (years === 1 ? ' year' : ' years'); // 몇년도 몇월까지 나오는 수
  // 남은 개월수가 있다면
  if (monthsLeft > 0) {
    yearsAndMonth += `, ${monthsLeft} ${
      monthsLeft === 1 ? ' month' : ' months'
    }`;
  }
  return `${yearsAndMonth} ago`;
}
