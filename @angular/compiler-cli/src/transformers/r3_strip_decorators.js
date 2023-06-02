/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/transformers/r3_strip_decorators", ["require", "exports", "typescript", "@angular/compiler-cli/src/metadata/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const metadata_1 = require("@angular/compiler-cli/src/metadata/index");
    function getDecoratorStripTransformerFactory(coreDecorators, reflector, checker) {
        return function (context) {
            return function (sourceFile) {
                const stripDecoratorsFromClassDeclaration = (node) => {
                    if (node.decorators === undefined) {
                        return node;
                    }
                    const decorators = node.decorators.filter(decorator => {
                        const callExpr = decorator.expression;
                        if (ts.isCallExpression(callExpr)) {
                            const id = callExpr.expression;
                            if (ts.isIdentifier(id)) {
                                const symbol = resolveToStaticSymbol(id, sourceFile.fileName, reflector, checker);
                                return symbol && coreDecorators.has(symbol);
                            }
                        }
                        return true;
                    });
                    if (decorators.length !== node.decorators.length) {
                        return ts.updateClassDeclaration(node, decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses || [], node.members);
                    }
                    return node;
                };
                const stripDecoratorPropertyAssignment = (node) => {
                    return ts.visitEachChild(node, member => {
                        if (!ts.isPropertyDeclaration(member) || !isDecoratorAssignment(member) ||
                            !member.initializer || !ts.isArrayLiteralExpression(member.initializer)) {
                            return member;
                        }
                        const newInitializer = ts.visitEachChild(member.initializer, decorator => {
                            if (!ts.isObjectLiteralExpression(decorator)) {
                                return decorator;
                            }
                            const type = lookupProperty(decorator, 'type');
                            if (!type || !ts.isIdentifier(type)) {
                                return decorator;
                            }
                            const symbol = resolveToStaticSymbol(type, sourceFile.fileName, reflector, checker);
                            if (!symbol || !coreDecorators.has(symbol)) {
                                return decorator;
                            }
                            return undefined;
                        }, context);
                        if (newInitializer === member.initializer) {
                            return member;
                        }
                        else if (newInitializer.elements.length === 0) {
                            return undefined;
                        }
                        else {
                            return ts.updateProperty(member, member.decorators, member.modifiers, member.name, member.questionToken, member.type, newInitializer);
                        }
                    }, context);
                };
                return ts.visitEachChild(sourceFile, stmt => {
                    if (ts.isClassDeclaration(stmt)) {
                        let decl = stmt;
                        if (stmt.decorators) {
                            decl = stripDecoratorsFromClassDeclaration(stmt);
                        }
                        return stripDecoratorPropertyAssignment(decl);
                    }
                    return stmt;
                }, context);
            };
        };
    }
    exports.getDecoratorStripTransformerFactory = getDecoratorStripTransformerFactory;
    function isDecoratorAssignment(member) {
        if (!ts.isPropertyDeclaration(member)) {
            return false;
        }
        if (!member.modifiers ||
            !member.modifiers.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword)) {
            return false;
        }
        if (!ts.isIdentifier(member.name) || member.name.text !== 'decorators') {
            return false;
        }
        if (!member.initializer || !ts.isArrayLiteralExpression(member.initializer)) {
            return false;
        }
        return true;
    }
    function lookupProperty(expr, prop) {
        const decl = expr.properties.find(elem => !!elem.name && ts.isIdentifier(elem.name) && elem.name.text === prop);
        if (decl === undefined || !ts.isPropertyAssignment(decl)) {
            return undefined;
        }
        return decl.initializer;
    }
    function resolveToStaticSymbol(id, containingFile, reflector, checker) {
        const res = checker.getSymbolAtLocation(id);
        if (!res || !res.declarations || res.declarations.length === 0) {
            return null;
        }
        const decl = res.declarations[0];
        if (!ts.isImportSpecifier(decl)) {
            return null;
        }
        const moduleSpecifier = decl.parent.parent.parent.moduleSpecifier;
        if (!ts.isStringLiteral(moduleSpecifier)) {
            return null;
        }
        return reflector.tryFindDeclaration(moduleSpecifier.text, id.text, containingFile);
    }
    class StripDecoratorsMetadataTransformer {
        constructor(coreDecorators, reflector) {
            this.coreDecorators = coreDecorators;
            this.reflector = reflector;
        }
        start(sourceFile) {
            return (value, node) => {
                if (metadata_1.isClassMetadata(value) && ts.isClassDeclaration(node) && value.decorators) {
                    value.decorators = value.decorators.filter(d => {
                        if (metadata_1.isMetadataSymbolicCallExpression(d) &&
                            metadata_1.isMetadataImportedSymbolReferenceExpression(d.expression)) {
                            const declaration = this.reflector.tryFindDeclaration(d.expression.module, d.expression.name, sourceFile.fileName);
                            if (declaration && this.coreDecorators.has(declaration)) {
                                return false;
                            }
                        }
                        return true;
                    });
                }
                return value;
            };
        }
    }
    exports.StripDecoratorsMetadataTransformer = StripDecoratorsMetadataTransformer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfc3RyaXBfZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvdHJhbnNmb3JtZXJzL3IzX3N0cmlwX2RlY29yYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFHSCxpQ0FBaUM7SUFFakMsdUVBQTBJO0lBTzFJLFNBQWdCLG1DQUFtQyxDQUMvQyxjQUFpQyxFQUFFLFNBQTBCLEVBQzdELE9BQXVCO1FBQ3pCLE9BQU8sVUFBUyxPQUFpQztZQUMvQyxPQUFPLFVBQVMsVUFBeUI7Z0JBQ3ZDLE1BQU0sbUNBQW1DLEdBQ3JDLENBQUMsSUFBeUIsRUFBdUIsRUFBRTtvQkFDakQsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTt3QkFDakMsT0FBTyxJQUFJLENBQUM7cUJBQ2I7b0JBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQ3BELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7d0JBQ3RDLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFOzRCQUNqQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDOzRCQUMvQixJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0NBQ3ZCLE1BQU0sTUFBTSxHQUFHLHFCQUFxQixDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQ0FDbEYsT0FBTyxNQUFNLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDN0M7eUJBQ0Y7d0JBQ0QsT0FBTyxJQUFJLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUM7b0JBQ0gs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RSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUU7b0JBQzdFLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQzdDLElBQUksMkNBQWdDLENBQUMsQ0FBQyxDQUFDOzRCQUNuQyxzREFBMkMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUU7NEJBQzdELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQ2pELENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDakUsSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0NBQ3ZELE9BQU8sS0FBSyxDQUFDOzZCQUNkO3lCQUNGO3dCQUNELE9BQU8sSUFBSSxDQUFDO29CQUNkLENBQUMsQ0FBQyxDQUFDO2lCQUNKO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDO1FBQ0osQ0FBQztLQUNGO0lBckJELGdGQXFCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTdGF0aWNSZWZsZWN0b3IsIFN0YXRpY1N5bWJvbH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7TWV0YWRhdGFWYWx1ZSwgaXNDbGFzc01ldGFkYXRhLCBpc01ldGFkYXRhSW1wb3J0ZWRTeW1ib2xSZWZlcmVuY2VFeHByZXNzaW9uLCBpc01ldGFkYXRhU3ltYm9saWNDYWxsRXhwcmVzc2lvbn0gZnJvbSAnLi4vbWV0YWRhdGEnO1xuXG5pbXBvcnQge01ldGFkYXRhVHJhbnNmb3JtZXIsIFZhbHVlVHJhbnNmb3JtfSBmcm9tICcuL21ldGFkYXRhX2NhY2hlJztcblxuZXhwb3J0IHR5cGUgVHJhbnNmb3JtZXIgPSAoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkgPT4gdHMuU291cmNlRmlsZTtcbmV4cG9ydCB0eXBlIFRyYW5zZm9ybWVyRmFjdG9yeSA9IChjb250ZXh0OiB0cy5UcmFuc2Zvcm1hdGlvbkNvbnRleHQpID0+IFRyYW5zZm9ybWVyO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVjb3JhdG9yU3RyaXBUcmFuc2Zvcm1lckZhY3RvcnkoXG4gICAgY29yZURlY29yYXRvcnM6IFNldDxTdGF0aWNTeW1ib2w+LCByZWZsZWN0b3I6IFN0YXRpY1JlZmxlY3RvcixcbiAgICBjaGVja2VyOiB0cy5UeXBlQ2hlY2tlcik6IFRyYW5zZm9ybWVyRmFjdG9yeSB7XG4gIHJldHVybiBmdW5jdGlvbihjb250ZXh0OiB0cy5UcmFuc2Zvcm1hdGlvbkNvbnRleHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oc291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6IHRzLlNvdXJjZUZpbGUge1xuICAgICAgY29uc3Qgc3RyaXBEZWNvcmF0b3JzRnJvbUNsYXNzRGVjbGFyYXRpb24gPVxuICAgICAgICAgIChub2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uKTogdHMuQ2xhc3NEZWNsYXJhdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5kZWNvcmF0b3JzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkZWNvcmF0b3JzID0gbm9kZS5kZWNvcmF0b3JzLmZpbHRlcihkZWNvcmF0b3IgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjYWxsRXhwciA9IGRlY29yYXRvci5leHByZXNzaW9uO1xuICAgICAgICAgICAgICBpZiAodHMuaXNDYWxsRXhwcmVzc2lvbihjYWxsRXhwcikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGNhbGxFeHByLmV4cHJlc3Npb247XG4gICAgICAgICAgICAgICAgaWYgKHRzLmlzSWRlbnRpZmllcihpZCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHN5bWJvbCA9IHJlc29sdmVUb1N0YXRpY1N5bWJvbChpZCwgc291cmNlRmlsZS5maWxlTmFtZSwgcmVmbGVjdG9yLCBjaGVja2VyKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzeW1ib2wgJiYgY29yZURlY29yYXRvcnMuaGFzKHN5bWJvbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZGVjb3JhdG9ycy5sZW5ndGggIT09IG5vZGUuZGVjb3JhdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRzLnVwZGF0ZUNsYXNzRGVjbGFyYXRpb24oXG4gICAgICAgICAgICAgICAgICBub2RlLCBkZWNvcmF0b3JzLCBub2RlLm1vZGlmaWVycywgbm9kZS5uYW1lLCBub2RlLnR5cGVQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgbm9kZS5oZXJpdGFnZUNsYXVzZXMgfHwgW10sIG5vZGUubWVtYmVycywgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIH07XG5cbiAgICAgIGNvbnN0IHN0cmlwRGVjb3JhdG9yUHJvcGVydHlBc3NpZ25tZW50ID0gKG5vZGU6IHRzLkNsYXNzRGVjbGFyYXRpb24pOiB0cy5DbGFzc0RlY2xhcmF0aW9uID0+IHtcbiAgICAgICAgcmV0dXJuIHRzLnZpc2l0RWFjaENoaWxkKG5vZGUsIG1lbWJlciA9PiB7XG4gICAgICAgICAgaWYgKCF0cy5pc1Byb3BlcnR5RGVjbGFyYXRpb24obWVtYmVyKSB8fCAhaXNEZWNvcmF0b3JBc3NpZ25tZW50KG1lbWJlcikgfHxcbiAgICAgICAgICAgICAgIW1lbWJlci5pbml0aWFsaXplciB8fCAhdHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKG1lbWJlci5pbml0aWFsaXplcikpIHtcbiAgICAgICAgICAgIHJldHVybiBtZW1iZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgbmV3SW5pdGlhbGl6ZXIgPSB0cy52aXNpdEVhY2hDaGlsZChtZW1iZXIuaW5pdGlhbGl6ZXIsIGRlY29yYXRvciA9PiB7XG4gICAgICAgICAgICBpZiAoIXRzLmlzT2JqZWN0TGl0ZXJhbEV4cHJlc3Npb24oZGVjb3JhdG9yKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGxvb2t1cFByb3BlcnR5KGRlY29yYXRvciwgJ3R5cGUnKTtcbiAgICAgICAgICAgIGlmICghdHlwZSB8fCAhdHMuaXNJZGVudGlmaWVyKHR5cGUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZWNvcmF0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzeW1ib2wgPSByZXNvbHZlVG9TdGF0aWNTeW1ib2wodHlwZSwgc291cmNlRmlsZS5maWxlTmFtZSwgcmVmbGVjdG9yLCBjaGVja2VyKTtcbiAgICAgICAgICAgIGlmICghc3ltYm9sIHx8ICFjb3JlRGVjb3JhdG9ycy5oYXMoc3ltYm9sKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9LCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChuZXdJbml0aWFsaXplciA9PT0gbWVtYmVyLmluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVtYmVyO1xuICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5pdGlhbGl6ZXIuZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHMudXBkYXRlUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgbWVtYmVyLCBtZW1iZXIuZGVjb3JhdG9ycywgbWVtYmVyLm1vZGlmaWVycywgbWVtYmVyLm5hbWUsIG1lbWJlci5xdWVzdGlvblRva2VuLFxuICAgICAgICAgICAgICAgIG1lbWJlci50eXBlLCBuZXdJbml0aWFsaXplcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBjb250ZXh0KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0cy52aXNpdEVhY2hDaGlsZChzb3VyY2VGaWxlLCBzdG10ID0+IHtcbiAgICAgICAgaWYgKHRzLmlzQ2xhc3NEZWNsYXJhdGlvbihzdG10KSkge1xuICAgICAgICAgIGxldCBkZWNsID0gc3RtdDtcbiAgICAgICAgICBpZiAoc3RtdC5kZWNvcmF0b3JzKSB7XG4gICAgICAgICAgICBkZWNsID0gc3RyaXBEZWNvcmF0b3JzRnJvbUNsYXNzRGVjbGFyYXRpb24oc3RtdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdHJpcERlY29yYXRvclByb3BlcnR5QXNzaWdubWVudChkZWNsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RtdDtcbiAgICAgIH0sIGNvbnRleHQpO1xuICAgIH07XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzRGVjb3JhdG9yQXNzaWdubWVudChtZW1iZXI6IHRzLkNsYXNzRWxlbWVudCk6IGJvb2xlYW4ge1xuICBpZiAoIXRzLmlzUHJvcGVydHlEZWNsYXJhdGlvbihtZW1iZXIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICghbWVtYmVyLm1vZGlmaWVycyB8fFxuICAgICAgIW1lbWJlci5tb2RpZmllcnMuc29tZShtb2QgPT4gbW9kLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuU3RhdGljS2V5d29yZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCF0cy5pc0lkZW50aWZpZXIobWVtYmVyLm5hbWUpIHx8IG1lbWJlci5uYW1lLnRleHQgIT09ICdkZWNvcmF0b3JzJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoIW1lbWJlci5pbml0aWFsaXplciB8fCAhdHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKG1lbWJlci5pbml0aWFsaXplcikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGxvb2t1cFByb3BlcnR5KGV4cHI6IHRzLk9iamVjdExpdGVyYWxFeHByZXNzaW9uLCBwcm9wOiBzdHJpbmcpOiB0cy5FeHByZXNzaW9ufHVuZGVmaW5lZCB7XG4gIGNvbnN0IGRlY2wgPSBleHByLnByb3BlcnRpZXMuZmluZChcbiAgICAgIGVsZW0gPT4gISFlbGVtLm5hbWUgJiYgdHMuaXNJZGVudGlmaWVyKGVsZW0ubmFtZSkgJiYgZWxlbS5uYW1lLnRleHQgPT09IHByb3ApO1xuICBpZiAoZGVjbCA9PT0gdW5kZWZpbmVkIHx8ICF0cy5pc1Byb3BlcnR5QXNzaWdubWVudChkZWNsKSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIGRlY2wuaW5pdGlhbGl6ZXI7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVUb1N0YXRpY1N5bWJvbChcbiAgICBpZDogdHMuSWRlbnRpZmllciwgY29udGFpbmluZ0ZpbGU6IHN0cmluZywgcmVmbGVjdG9yOiBTdGF0aWNSZWZsZWN0b3IsXG4gICAgY2hlY2tlcjogdHMuVHlwZUNoZWNrZXIpOiBTdGF0aWNTeW1ib2x8bnVsbCB7XG4gIGNvbnN0IHJlcyA9IGNoZWNrZXIuZ2V0U3ltYm9sQXRMb2NhdGlvbihpZCk7XG4gIGlmICghcmVzIHx8ICFyZXMuZGVjbGFyYXRpb25zIHx8IHJlcy5kZWNsYXJhdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgY29uc3QgZGVjbCA9IHJlcy5kZWNsYXJhdGlvbnNbMF07XG4gIGlmICghdHMuaXNJbXBvcnRTcGVjaWZpZXIoZGVjbCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBtb2R1bGVTcGVjaWZpZXIgPSBkZWNsLnBhcmVudCAhLnBhcmVudCAhLnBhcmVudCAhLm1vZHVsZVNwZWNpZmllcjtcbiAgaWYgKCF0cy5pc1N0cmluZ0xpdGVyYWwobW9kdWxlU3BlY2lmaWVyKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZWZsZWN0b3IudHJ5RmluZERlY2xhcmF0aW9uKG1vZHVsZVNwZWNpZmllci50ZXh0LCBpZC50ZXh0LCBjb250YWluaW5nRmlsZSk7XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpcERlY29yYXRvcnNNZXRhZGF0YVRyYW5zZm9ybWVyIGltcGxlbWVudHMgTWV0YWRhdGFUcmFuc2Zvcm1lciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29yZURlY29yYXRvcnM6IFNldDxTdGF0aWNTeW1ib2w+LCBwcml2YXRlIHJlZmxlY3RvcjogU3RhdGljUmVmbGVjdG9yKSB7fVxuXG4gIHN0YXJ0KHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiBWYWx1ZVRyYW5zZm9ybXx1bmRlZmluZWQge1xuICAgIHJldHVybiAodmFsdWU6IE1ldGFkYXRhVmFsdWUsIG5vZGU6IHRzLk5vZGUpOiBNZXRhZGF0YVZhbHVlID0+IHtcbiAgICAgIGlmIChpc0NsYXNzTWV0YWRhdGEodmFsdWUpICYmIHRzLmlzQ2xhc3NEZWNsYXJhdGlvbihub2RlKSAmJiB2YWx1ZS5kZWNvcmF0b3JzKSB7XG4gICAgICAgIHZhbHVlLmRlY29yYXRvcnMgPSB2YWx1ZS5kZWNvcmF0b3JzLmZpbHRlcihkID0+IHtcbiAgICAgICAgICBpZiAoaXNNZXRhZGF0YVN5bWJvbGljQ2FsbEV4cHJlc3Npb24oZCkgJiZcbiAgICAgICAgICAgICAgaXNNZXRhZGF0YUltcG9ydGVkU3ltYm9sUmVmZXJlbmNlRXhwcmVzc2lvbihkLmV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgICBjb25zdCBkZWNsYXJhdGlvbiA9IHRoaXMucmVmbGVjdG9yLnRyeUZpbmREZWNsYXJhdGlvbihcbiAgICAgICAgICAgICAgICBkLmV4cHJlc3Npb24ubW9kdWxlLCBkLmV4cHJlc3Npb24ubmFtZSwgc291cmNlRmlsZS5maWxlTmFtZSk7XG4gICAgICAgICAgICBpZiAoZGVjbGFyYXRpb24gJiYgdGhpcy5jb3JlRGVjb3JhdG9ycy5oYXMoZGVjbGFyYXRpb24pKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==