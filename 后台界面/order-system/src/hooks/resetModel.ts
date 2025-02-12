export default function resetModel(model: Record<string, any>) {
    for (const key in model) {
        if (Array.isArray(model[key])) {
            model[key] = [];
        } else if (typeof model[key] === 'object' && model[key] !== null) {
            model[key] = {};
        } else {
            model[key] = '';
        }
    }
}