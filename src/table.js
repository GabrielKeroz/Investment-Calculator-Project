const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableID) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !tableID
  ) {
    throw new Error(
      "Para a correta execução, precisamos de um array com as colunas, outro com as informações das linhas e também o ID do elemento tabela selecionado"
    );
  }

  const tableElement = document.getElementById(tableID);
  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error("ID informado não corresponde à nenhum elemento table");
  }

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  function createTheadElement(tableReference) {
    const thead = document.createElement("thead");
    tableReference.appendChild(thead);
    return thead;
  }

  const tableHeaderReference =
    tableReference.querySelector("thead") ?? createTheadElement(tableReference);

  const headerRow = document.createElement("tr");

  ["bg-blue-900", "text-slate-200", "sticky", "top-0"].forEach((cssClass) =>
    headerRow.classList.add(cssClass)
  );

  for (const tableColumnObject of columnsArray) {
    const headerElement = /*html*/ `<th class='text-center'>${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }

  tableHeaderReference.appendChild(headerRow);
}

function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(tbody);
    return tbody;
  }

  const tableBodyReference =
    tableReference.querySelector("tbody") ?? createTbodyElement(tableReference);

  for (const [itemIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement("tr");

    if (itemIndex % 2 !== 0) {
      tableRow.classList.add("bg-blue-200");
    }

    for (const tableColumn of columnsArray) {
      const formatFn = tableColumn.format ?? ((info) => info);

      tableRow.innerHTML += /*html*/ `<td class='text-center'>${formatFn(
        tableItem[tableColumn.accessor]
      )}</td>`;
    }

    tableBodyReference.appendChild(tableRow);
  }
}
