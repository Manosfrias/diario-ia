import { ValidationError } from '../../../domain/errors/ValidationError.js';

export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

export function createErrorHandler(logger) {
  // Express reconoce los manejadores de error por tener 4 parámetros
  return (error, _req, res, _next) => {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    if (error.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' });
    }

    logger.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  };
}
