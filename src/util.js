function download_CSV(name, value) {
        let encodedUri = encodeURI(value);
        let link = document.createElement("a");
        link.setAttribute(
                "href",
                "data:text/csv;charset=utf-8,\uFEFF" + encodedUri
        );
        link.setAttribute("download", `katya-${name}.csv`);
        link.click();
}

export const downloadCSV = download_CSV;
