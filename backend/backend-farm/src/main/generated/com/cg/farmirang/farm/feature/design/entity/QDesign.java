package com.cg.farmirang.farm.feature.design.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDesign is a Querydsl query type for Design
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDesign extends EntityPathBase<Design> {

    private static final long serialVersionUID = 476723897L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDesign design = new QDesign("design");

    public final StringPath arrangementId = createString("arrangementId");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final ListPath<CropSelection, QCropSelection> cropSelections = this.<CropSelection, QCropSelection>createList("cropSelections", CropSelection.class, QCropSelection.class, PathInits.DIRECT2);

    public final ListPath<FarmCoordinate, QFarmCoordinate> farmCoordinates = this.<FarmCoordinate, QFarmCoordinate>createList("farmCoordinates", FarmCoordinate.class, QFarmCoordinate.class, PathInits.DIRECT2);

    public final NumberPath<Integer> furrowWidth = createNumber("furrowWidth", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isHorizontal = createBoolean("isHorizontal");

    public final BooleanPath isThumbnail = createBoolean("isThumbnail");

    public final QMember member;

    public final StringPath name = createString("name");

    public final NumberPath<Integer> ridgeArea = createNumber("ridgeArea", Integer.class);

    public final NumberPath<Integer> ridgeWidth = createNumber("ridgeWidth", Integer.class);

    public final NumberPath<Integer> startMonth = createNumber("startMonth", Integer.class);

    public final NumberPath<Integer> totalArea = createNumber("totalArea", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> updatedAt = createDateTime("updatedAt", java.time.LocalDateTime.class);

    public QDesign(String variable) {
        this(Design.class, forVariable(variable), INITS);
    }

    public QDesign(Path<? extends Design> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDesign(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDesign(PathMetadata metadata, PathInits inits) {
        this(Design.class, metadata, inits);
    }

    public QDesign(Class<? extends Design> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

