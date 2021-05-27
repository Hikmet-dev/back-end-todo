

export const PATCH = (req, res) => {
        let idParam = req.params['idParam'];
        res.send('Patch request task:  ' + idParam);
};