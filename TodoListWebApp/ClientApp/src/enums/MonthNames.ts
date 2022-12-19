import { MonthEnum } from "./MonthEnum";

const MonthNames = (month: MonthEnum) => {
  switch(month) {
    case MonthEnum.STYCZEN: 
      return "STYCZEN";
    case MonthEnum.LUTY: 
      return "LUTY";
    case MonthEnum.MARZEC: 
      return "MARZEC";
    case MonthEnum.KWIECIEN: 
      return "KWIECIEN";
    case MonthEnum.MAJ: 
      return "MAJ";
    case MonthEnum.CZERWIEC: 
      return "CZERWIEC";
    case MonthEnum.LIPIEC: 
      return "LIPIEC";
    case MonthEnum.SIERPIEN: 
      return "SIERPIEN";
    case MonthEnum.WRZESIEN: 
      return "WRZESIEN";
    case MonthEnum.PAZDZIERNIK: 
      return "PAZDZIERNIK";
    case MonthEnum.LISTOPAD: 
      return "LISTOPAD";
    case MonthEnum.GRUDZIEN: 
      return "GRUDZIEN";
    default: return "BLAD";
  }

}

export default MonthNames;