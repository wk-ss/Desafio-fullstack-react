export type Moeda = "BRL" | "USD" | "RUB";

export function converter(valor: number | string, moeda: Moeda) {
  const numero = Number(valor);

  if (isNaN(numero)) return "0.00";

  switch (moeda) {
    case "USD":
      return (numero * 0.19).toFixed(2);
    case "RUB":
      return (numero * 14.77).toFixed(2);
    default:
      return numero.toFixed(2);
  }
}

export function simbolo(moeda: Moeda) {
  switch (moeda) {
    case "USD":
      return "US$";
    case "RUB":
      return "₽";
    default:
      return "R$";
  }
}
