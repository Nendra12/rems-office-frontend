const apiURL = import.meta.env.VITE_API_BASE_URL
const base_path = "api/hrd"

export const AddRoles = async (formData) => {
    try {
        const response = await fetch(`${apiURL}/${base_path}/roles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Gagal Menyimpan")
        }

        return result
    } catch (error) {
        return error
    }
}

export const GetDataRoles = async () => {
    try {
        const response = await fetch(`${apiURL}/${base_path}/roles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
        })

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server tidak mengirim JSON. Pastikan apiURL dan endpoint benar.");
        }

        const result = await response.json()
        console.log(result)

        if (!response.ok) {
            throw new Error(result.message || "Gagal Mengambil Data Role")
        }
        return result.data || result
    } catch (error) {
        console.error("Error Fetching Roles:", error.message);
    }
}

export const editRole = async (formData, id) => {
    try {
        const response = await fetch(`${apiURL}/${base_path}/roles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify(formData),
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Gagal Mengedit")
        }

        return result

    } catch (error) {
        return error
    }
}


export const deleteRole = async (id) => {
    try {
        const response = await fetch(`${apiURL}/${base_path}/roles/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Gagal Menghapus")
        }

        return result

    } catch (error) {
        return error
    }
}