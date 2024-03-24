document.addEventListener("DOMContentLoaded", () => {
    const name = document.getElementById("name");
    const category = document.getElementById("category");
    const quantity = document.getElementById("quantity");
    const unitPrice = document.getElementById("unitPrice");
    const total = document.getElementById("total");
    const customer = document.getElementById("customer");

    const submit = document.getElementById("submit");

    submit.addEventListener("click", async (e) => {
        e.preventDefault();

        submit.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang lưu...';
        submit.disabled = true;

        if (!name.value || !category.value || !quantity.value || !unitPrice.value || !total.value || !customer.value) {
            alert("Vui lòng điền đầy đủ thông tin!");
            submit.innerHTML = "Lưu";
            submit.disabled = false;
            return;
        }

        const data = {
            name: name.value,
            category: category.value,
            quantity: quantity.value,
            unitPrice: unitPrice.value,
            total: total.value,
            customer: customer.value,
        };

        try {
            await postGoogle(data);
            alert("Success!");
        } catch (error) {
            console.error(error);
        } finally {
            name.value = "";
            category.value = "";
            quantity.value = "";
            unitPrice.value = "";
            total.value = "";
            customer.value = "";

            submit.innerHTML = "Lưu";
            submit.disabled = false;
        }
    });

    async function postGoogle(data) {
        const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSdF1aWzmI-TC6dk-79eEfXpP0dtelFCw8AdlhfJ2J4XtutrwQ/formResponse";

        const formData = new FormData();
        formData.append("entry.746418407", data.name);
        formData.append("entry.514569438", data.category);
        formData.append("entry.1329196043", data.quantity);
        formData.append("entry.1429217841", data.unitPrice);
        formData.append("entry.1699770790", data.total);
        formData.append("entry.455024183", data.customer);

        await fetch(formURL, {
            method: "POST",
            body: formData,
        });
    }
});
