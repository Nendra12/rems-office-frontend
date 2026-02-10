const apiURL = import.meta.env.VITE_API_BASE_URL

export const AddRoles = async (formData) => {
    try {
        const response = await fetch(`${apiURL}/api/hrd/roles`, {
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

        return result.message
    } catch (error) {
        return error
    }
}

export const GetDataRoles = async () => {
    try {
        const response = await fetch(`${apiURL}/api/hrd/roles`, {
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
